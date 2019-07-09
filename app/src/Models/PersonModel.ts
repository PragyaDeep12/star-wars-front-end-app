export default interface PersonModel {
  id?: number | null;
  name?: string | null;
  height?: number | null;
  birth_year?: string | null;
  created?: string | null;
  edited?: string | null;
  eye_color?: string | null;
  films?: Array<String> | null;
  gender?: string | null;
  homeworld?: string | null;
  mass?: string | null;
  skin_color?: string | null;
  species?: Array<string> | null;
  starships?: Array<string> | null;
  vehicles?: Array<string> | null;
  url?: string | null;
  hair_color?: string | null;
}
