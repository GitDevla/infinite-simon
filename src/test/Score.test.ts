import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultScoreboard, saveScore, fetchScoreboard } from '../service/ScoreLocal';

describe("Local Score Component", () => {
    test('Local score clear', async () => {
        defaultScoreboard();
        const scores = await fetchScoreboard();
        expect(scores.length).toBe(2);
        expect(scores[0].player).toBe("Simonfi Sándor");
        expect(scores[0].score).toBe(-1);
        expect(scores[1].player).toBe("Simonfi Sándor né");
        expect(scores[1].score).toBe(-2);
    });

    test('Local score add', async () => {
        saveScore("TestUser", 5);
        const scores = await fetchScoreboard();
        expect(scores.length).toBe(3);
        expect(scores[0].player).toBe("TestUser");
        expect(scores[0].score).toBe(5);
    });
});