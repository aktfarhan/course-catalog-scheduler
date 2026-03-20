// Room code prefix → building name lookup
const BUILDING_MAP: Record<string, string> = {
    W: 'Wheatley-Peters',
    M: 'McCormack',
    Y: 'University Hall',
    H: 'Healey',
    HLL: 'Healey',
    HUL: 'Healey',
    I: 'ISC',
    Q: 'Quinn',
    QUL: 'Quinn',
};

// Locations that should not be normalized
const SPECIAL = new Set([
    'BEACONFLEX',
    'REMOTE',
    'ON-LINE COURSE',
    'ON-LINE LMS CHAT TIME',
    'TO BE DETERMINED/ASSIGNED',
    'NEW ENGLAND AQUARIUM',
]);

/**
 * Normalizes a raw location string into "BuildingName RoomCode" format.
 *
 * @param raw - Raw location string.
 * @returns Normalized location string, or the original for special locations.
 */
export function normalizeLocation(raw: string): string {
    let location = raw.trim();
    if (!location) return '';

    // 1. Skip special locations
    if (SPECIAL.has(location.toUpperCase())) return location;

    // 2. Standardize Wheatley-Peters variants and fix missing spaces
    location = location
        .replace(/Wh-Peters(?=[A-Za-z])/gi, 'Wheatley-Peters ')
        .replace(/Wh-Peters/gi, 'Wheatley-Peters');

    // 3. Extract room code — group 1: base code, group 2: optional trailing letter
    const roomMatch = location.match(/([A-Za-z]+\d*-\d+)([A-Za-z])?/);
    if (!roomMatch) return location;

    // Only include the trailing letter if it's a true suffix
    let roomCode = roomMatch[1];
    const suffix = roomMatch[2];
    const charAfterSuffix = location[roomMatch.index! + roomMatch[0].length];
    if (suffix && (!charAfterSuffix || !/[A-Za-z]/.test(charAfterSuffix))) {
        roomCode += suffix;
    }

    // Uppercase the room code and extract any text before it as the building name
    roomCode = roomCode.toUpperCase();
    const beforeRoom = location.slice(0, roomMatch.index).trim();

    // 4. Determine building name — either from existing text or prefix lookup
    let buildingName = beforeRoom;
    if (!buildingName) {
        // No building name present — resolve from room code letter prefix
        const prefixMatch = roomCode.match(/^([A-Z]+)/);
        if (prefixMatch) {
            buildingName = BUILDING_MAP[prefixMatch[1]] || '';
        }
    } else {
        // Capitalize first letter of each word to fix inconsistent casing
        buildingName = buildingName.replace(/\b[a-z]/g, (c) => c.toUpperCase());
    }

    // 5. Return normalized location
    return buildingName ? `${buildingName} ${roomCode}` : roomCode;
}
