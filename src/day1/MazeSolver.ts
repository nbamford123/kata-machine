const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    function travel(
        position: Point,
        seen: boolean[][],
        path: Point[],
    ): boolean {
        const curMaze = maze[position.y][position.x];
        // Off the map
        if (
            position.x < 0 ||
            position.x >= maze[0].length ||
            position.y < 0 ||
            position.y >= maze.length
        )
            return false;
        // On a wall
        else if (curMaze === wall) return false;
        // At end position
        else if (position.x === end.x && position.y === end.y) {
            path.push(end);
            return true;
        } else if (seen[position.y][position.x]) return false;
        
        // update current status
        seen[position.y][position.x] = true;
        path.push(position);
        
        // Recurse pre, recurse post
        for (let i = 0; i < dir.length; i++) {
            const [x, y] = dir[i];
            if (travel({ x: position.x + x, y: position.y + y }, seen, path))
                return true;
        }
        path.pop();
        return false;
    }
    const seen: boolean[][] = [];
    for (let i = 0; i < maze.length; i++) {
        seen[i] = new Array(maze[0].length).fill(false);
    }
    const path: Point[] = [];
    const ret = travel(start, seen, path);
    return path;
}
