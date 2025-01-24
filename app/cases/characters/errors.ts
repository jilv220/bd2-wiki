export class CharacterDataNotFound extends Error {
	characterName: string;

	constructor(message: string, characterName: string) {
		super(message);
		this.characterName = characterName;
	}
}
