/* =======================
   URL HELPERS
======================= */
function getParams() {
    return new URLSearchParams(location.hash.substring(1));
}

function setParams(params) {
    history.replaceState(null, '', '#' + params.toString());
}

/* =======================
   STATE
======================= */
let currentMain = null;
let currentSub = null;

/* =======================
   MAIN LOADERS
======================= */
function loadMain(page, restoring = false) {
    const content = document.getElementById('content');
    if (!content) return;

    // toggle main
    if (!restoring && currentMain === page) {
        content.innerHTML = '';
        currentMain = null;
        currentSub = null;

        const params = getParams();
        params.delete('main');
        params.delete('sub');
        setParams(params);
        return;
    }

    // HARD RESET
    content.innerHTML = '';
    currentSub = null;
    currentMain = page;

    fetch(page)
        .then(r => {
            if (!r.ok) throw new Error('Failed to load main');
            return r.text();
        })
        .then(html => {
            content.innerHTML = html;

            const params = getParams();
            params.set('main', page);
            setParams(params);

            // restore sub if present
            const sub = params.get('sub');
            if (sub) loadSub(sub, true);
        })
        .catch(err => {
            content.innerHTML = '<p>Error loading main page.</p>';
            console.error(err);
        });
}

function loadMain2(page, restoring = false) {
    const content = document.getElementById('content2');
    if (!content) return;

    if (!restoring && currentMain === page) {
        content.innerHTML = '';
        currentMain = null;
        currentSub = null;

        const params = getParams();
        params.delete('main2');
        params.delete('sub');
        setParams(params);
        return;
    }

    content.innerHTML = '';
    currentSub = null;
    currentMain = page;

    fetch(page)
        .then(r => {
            if (!r.ok) throw new Error('Failed to load main2');
            return r.text();
        })
        .then(html => {
            content.innerHTML = html;

            const params = getParams();
            params.set('main2', page);
            setParams(params);

            const sub = params.get('sub');
            if (sub) loadSub(sub, true);
        })
        .catch(err => {
            content.innerHTML = '<p>Error loading main2 page.</p>';
            console.error(err);
        });
}

/* =======================
   SUB LOADER
======================= */
function loadSub(page, restoring = false) {
    const sub = document.getElementById('subcontent');
    if (!sub) return;

    if (!restoring && currentSub === page) {
        sub.innerHTML = '';
        currentSub = null;

        const params = getParams();
        params.delete('sub');
        setParams(params);
        return;
    }

    fetch(page)
        .then(r => {
            if (!r.ok) throw new Error('Failed to load sub');
            return r.text();
        })
        .then(html => {
            sub.innerHTML = html;
            currentSub = page;

            const params = getParams();
            params.set('sub', page);
            setParams(params);
        })
        .catch(err => {
            sub.innerHTML = '<p>Error loading sub page.</p>';
            console.error(err);
        });
}

/* =======================
   ROUTER (THE KEY)
======================= */
function handleRoute() {
    const params = getParams();

    const main = params.get('main');
    const main2 = params.get('main2');

    if (main) loadMain(main, true);
    if (main2) loadMain2(main2, true);
}

/* =======================
   LISTENERS
======================= */
window.addEventListener('DOMContentLoaded', handleRoute);
window.addEventListener('hashchange', handleRoute);