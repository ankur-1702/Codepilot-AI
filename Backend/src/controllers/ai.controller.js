const aiService=require("../services/ai.service.js")

const HEARTBEAT_INTERVAL_MS = 15000;
const BLOCKED_STATUS_CODES = new Set([400, 403, 404, 429]);

function describeError(error) {
    console.error('Code review request failed:', {
        message: error.message,
        name: error.name,
        status: error.status,
        causeCode: error.cause?.code,
        causeMessage: error.cause?.message,
    });
    if (error.code === 'GEMINI_TIMEOUT') {
        return { status: 504, message: error.message };
    }
    if (error.code === 'GEMINI_OVERLOADED') {
        return { status: 503, message: error.message };
    }
    if (error.code === 'GEMINI_QUOTA_EXCEEDED') {
        return { status: 429, message: error.message };
    }
    const status = BLOCKED_STATUS_CODES.has(error.status) ? error.status : 502;
    return { status, message: `Gemini request failed: ${error.message}` };
}

function readCode(req) {
    return typeof req.body?.code === 'string' && req.body.code.trim() ? req.body.code : null;
}

// A quick syntax check catches ordinary chat prompts before they reach Gemini.
// It supports common JavaScript, Python, SQL, HTML, and C-style code patterns.
function looksLikeSourceCode(input) {
    const patterns = [
        /\b(?:const|let|var)\s+[\w$]+\s*(?:=|:)/,
        /^\s*(?:(?:int|float|double|bool|string|char|auto)\s+)?[\w$]+\s*(?:=|\+=|-=|\*=|\/=)\s*\S/m,
        /\bfunction\s*[\w$]*\s*\([^)]*\)\s*[{=>]/,
        /\b(?:def|class|fn|func)\s+\w+\s*[^\n]*[:{]/,
        /\b(?:if|for|while|switch|catch)\s*\([^\n]*\)\s*[{]/,
        /(?:=>|===?|!==?|&&|\|\|)/,
        /<\/?[A-Za-z][^>]*>/,
        /^\s*(?:SELECT|INSERT\s+INTO|UPDATE\s+\w+\s+SET|DELETE\s+FROM|CREATE\s+TABLE)\b/im,
        /^\s*(?:print|console\.log|return|throw|await)\s*\(/m,
        /^\s*#include\s*</m,
    ];

    return patterns.some((pattern) => pattern.test(input));
}

function sendEvent(res, payload) {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

module.exports.getReview = async (req, res) => {
    const code = readCode(req);

    if (!code) {
        return res.status(400).send('Code is required');
    }
    if (!looksLikeSourceCode(code)) {
        return res.status(400).send('Please paste source code to get a code review.');
    }

    try {
        const response = await aiService.generateContent(code);
        res.send(response);
    } catch (error) {
        const { status, message } = describeError(error);
        res.status(status).send(message);
    }

}

module.exports.getReviewStream = async (req, res) => {
    const code = readCode(req);

    if (!code) {
        return res.status(400).send('Code is required');
    }
    if (!looksLikeSourceCode(code)) {
        return res.status(400).send('Please paste source code to get a code review.');
    }

    const upstream = new AbortController();
    let clientGone = false;
    res.on('close', () => {
        if (res.writableEnded) return;
        clientGone = true;
        upstream.abort();
    });

    res.status(200).set({
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
    });
    res.flushHeaders();

    const heartbeat = setInterval(() => res.write(': ping\n\n'), HEARTBEAT_INTERVAL_MS);

    try {
        for await (const delta of aiService.streamGenerateContent(code, { signal: upstream.signal })) {
            sendEvent(res, { type: 'delta', text: delta });
        }
        sendEvent(res, { type: 'done' });
    } catch (error) {
        if (clientGone) {
            console.log('Client disconnected, stopped the Gemini stream early');
        } else {
            const { message } = describeError(error);
            sendEvent(res, { type: 'error', message });
        }
    } finally {
        clearInterval(heartbeat);
        res.end();
    }
}
