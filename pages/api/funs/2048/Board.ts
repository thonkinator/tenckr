import { alea, PRNG } from "seedrandom";

export enum Directions {
	UP = 0,
	RIGHT = 1,
	DOWN = 2,
	LEFT = 3,
}

export class Board {
	tiles: number[][];
	rng: PRNG;
	score: number = 0;

	constructor(w: number = 4, h: number = 4, seed: string = Math.random().toString()) {
		this.tiles = Array.from({ length: w }, (e) => Array(h).fill(0));
		// @types/seedrandom thinks alea isn't a constructor? https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/63471
		// @ts-ignore
		this.rng = new alea(seed);
		this.spawnTile();
		this.spawnTile();
	}

	rotateArray(arr: typeof this.tiles) {
		// https://medium.com/swlh/matrix-rotation-in-javascript-269cae14a124

		const M = arr.length;
		const N = arr[0].length;

		let destination = new Array(N);
		for (let i = 0; i < N; i++) {
			destination[i] = new Array(M);
		}

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < M; j++) {
				destination[i][j] = arr[M - j - 1][i];
			}
		}

		return destination;
	}

	compress() {
		this.tiles = this.tiles.map((col) =>
			col
				.filter((v) => v != 0)
				// https://stackoverflow.com/a/38851957
				.concat(Array(col.length).fill(0))
				.slice(0, col.length)
		);
	}

	merge() {
		this.tiles = this.tiles.map((col) =>
			col
				.reverse()
				.map((v, i, arr) => {
					if (v && arr[i + 1] == v) {
						arr[i + 1] = 0;
						this.score += v * 2;
						return v * 2;
					}
					return v;
				})
				.reverse()
		);
	}

	spawnTile() {
		const openTiles = this.tiles
			.flat()
			.map((v, i) => ({
				x: i % this.tiles.length,
				y: Math.floor(i / this.tiles[0].length),
				v: v,
			}))
			.filter(({ v }) => v == 0);
		const tile = openTiles[Math.floor(this.rng() * openTiles.length)];
		this.tiles[tile.x][tile.y] = this.rng() > 0.9 ? 4 : 2;
	}

	move(direction: Directions) {
		const oldArray = JSON.stringify(this.tiles);

		for (let i = 0; i < direction; i++) {
			this.tiles = this.rotateArray(this.tiles);
		}

		this.compress();
		this.merge();
		this.compress();

		for (let i = 0; i < ((-direction % 4) + 4) % 4; i++) {
			this.tiles = this.rotateArray(this.tiles);
		}

		if (JSON.stringify(this.tiles) != oldArray) {
			this.spawnTile();
		}
	}
}
