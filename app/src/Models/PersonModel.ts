export default interface PersonModel {
  name?: string | null;
  height?: number | null;
  birthYear?: string | null;
  created?: string | null;
  edited?: string | null;
  eyeColor?: string | null;
  films?: Array<String> | null;
  gender?: string | null;
  homeworld?: string | null;
  mass?: string | null;
  skinColor?: string | null;
  species?: Array<string> | null;
  starships?: Array<string> | null;
  vehicles?: Array<string> | null;
}
