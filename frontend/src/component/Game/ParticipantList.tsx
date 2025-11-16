import clsx from "clsx";
import { useEffect, useState } from "react";
import { Backend, type Participant } from "../../util/Backend";

export default function ParticipantList({
    matchID,
    updateCounter,
    showStatus = true,
}: {
    matchID: number;
    updateCounter?: number;
    showStatus?: boolean;
}) {
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        async function fetchParticipants() {
            try {
                const response = await Backend.getParticipantList(matchID);
                if (response.ok) {
                    const participantsData = response.data.participants;
                    participantsData.sort((a, b) => b.round_eliminated - a.round_eliminated);
                    setParticipants(participantsData);
                } else {
                    console.error("Failed to fetch participants");
                }
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        }

        fetchParticipants();
    }, [matchID, updateCounter]);
    return (
        <div className="absolute top-2 left-2 bg-bg-secondary rounded p-2 shadow-md w-48">
            <h3 className="font-bold mb-2">Participants</h3>
            <ul>
                {participants.map((participant, idx) => (
                    <li key={participant.user.username} className="flex items-center mb-1 gap-2">
                        {showStatus && (
                            <>
                                {idx === 0 && <span>🥇</span>}
                                {idx === 1 && <span>🥈</span>}
                                {idx === 2 && <span>🥉</span>}
                            </>
                        )}
                        <img
                            src={participant.user.avatar_uri}
                            alt={participant.user.username}
                            className="w-6 h-6 rounded-full mr-2"
                        />
                        <span>{participant.user.username}</span>
                        {showStatus && (
                            <span
                                className={clsx(
                                    `ml-auto font-mono text-sm`,
                                    participant.status === "playing"
                                        ? "text-simon-green"
                                        : participant.status === "finished"
                                            ? "text-simon-red"
                                            : "text-simon-yellow",
                                )}>
                                {participant.round_eliminated}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
