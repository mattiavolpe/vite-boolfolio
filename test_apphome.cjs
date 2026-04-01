const assert = require('node:assert');
const test = require('node:test');
const fs = require('fs');

test('AppHome.vue contains performance refactors', () => {
    const fileContent = fs.readFileSync('src/views/AppHome.vue', 'utf8');

    // 1. Check if unmounted is present and removes listener
    assert.match(fileContent, /unmounted\(\) \{/);
    assert.match(fileContent, /window\.removeEventListener\('scroll'/);

    // 2. Check if mounted adds passive listener
    assert.match(fileContent, /window\.addEventListener\('scroll', .*\{ passive: true \}\)/);

    // 3. Check if getBoundingClientRect is used safely
    assert.match(fileContent, /getBoundingClientRect\(\)\.y/);
    assert.doesNotMatch(fileContent, /getClientRects\(\)\[0\]\.y/);

    // 4. Check if requestAnimationFrame is used
    assert.match(fileContent, /window\.requestAnimationFrame/);

    // 5. Check if internal tracking variables are initialized in created
    assert.match(fileContent, /created\(\) \{/);
    assert.match(fileContent, /this\.ticking = false/);
});
