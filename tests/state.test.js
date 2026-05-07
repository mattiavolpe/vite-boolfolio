import test from 'node:test';
import assert from 'node:assert';
import { state } from '../src/state.js';

test('state variables are defined', () => {
    assert.ok(state.projectsEndpoint !== undefined);
});
