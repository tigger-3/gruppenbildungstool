import { Teilnehmer } from "../teilnehmer/teilnehmer";


export interface Gruppe {

  name: string;
  members: Teilnehmer[];
  id?: number;

}
