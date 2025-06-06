export interface Adresse {
  strasse?: string;
  hausnummer?: string;
  plz?: string;
  ort?: string;
  adressenzusatz?: string;
  postfach?: string;
  land?: string;
}

export interface Dokument {
  data: string;
  note?: DocumentNote;
  metadaten: DocumentMetadata;
  acl?: DocumentAccess[];
  /**
   * UUID des erzeugten Dokumentes.
   */
  readonly documentId?: string;
}

export interface DokumentList {
  /**
   * Document count
   */
  anzahl: number;
  /**
   * Offset-Parameter der Anfrage
   */
  offset: number;
  /**
   * Anzahl der Dokumente in der Ergebnismenge
   */
  limit: number;
  dokumente: DokumentOhneDaten[];
}

export interface DokumentOhneDaten {
  metadaten: DocumentMetadata;
  acl?: DocumentAccess[];
  /**
   * UUID des erzeugten Dokumentes.
   */
  readonly documentId?: string;
}

export interface DocumentMetadata {
  filename: string;
  filetype: string;
  description?: string;
  readonly filesize?: number;
  readonly createdOn?: string;
  readonly createdBy?: string;
  readonly changedOn?: string;
  readonly changedBy?: string;
  tags?: string[];
  properties?: Record<string, string>;
}

export interface DocumentAccess {
  userId: string;
  encryptedKey?: string;
  algorithm?: string;
}

export interface DocumentNote {
  /**
   * Überschrift der Notiz
   */
  headline: string;
  /**
   * Inhalt der Notiz
   */
  content: string;
}

export interface Gutachten {
  /**
   * UUID of the created assessment.
   */
  readonly auftragsId?: string;
  /**
   * Gutachtenformular
   */
  s0080?: object;
  readonly anhaenge?: string[];
}

export type GutachtenBearbeitungsstatus =
  | 'neu'
  | 'einbestellt'
  | 'in_bearbeitung'
  | 'abgeschlossen'
  | 'storniert';

export type GutachtenstatusFilter = 'alle' | GutachtenBearbeitungsstatus[];

export interface Gutachtenstatus {
  value: GutachtenBearbeitungsstatus;
  label: string;

  /**
   * Timestamp der Statusänderung (UTC)
   */
  readonly changedOn?: string;
}

export interface Gutachtenauftrag {
    /**
     * UUID of the created assessment.
     */
    readonly auftragsId?: string;
    proband?: Proband;
    gutachter?: Gutachter;
    readonly auftraggeber?: Organisation;
    readonly kennzeichen1?: string;
    readonly kennzeichen2?: string;
    gutachtenstatus: Gutachtenstatus;
    readonly anhaenge?: Array<DokumentOhneDaten>;
    gutachten?: Gutachten;
    /**
     * Wann wurde der Auftrag in rvSMD angelegt.
     */
    readonly auftragsdatum: string;
    /**
     * Wann ist der Auftrag in rvGutachten angekommen.
     */
    readonly eingangsdatum: string;
    /**
     * Wann sind alle Dokumente zu einem Auftrag in rvGutachten einsehbar
     */
    readonly bereitstellungsdatum?: string;
    /**
     * Zu wann wird der Proband einbestellt
     */
    einbestelldatum?: string;
  }

export interface GutachtenauftragList {
  /**
   * Gesamtanzahlanzahl der Aufträge
   */
  anzahl: number;
  /**
   * Offset-Parameter der Anfrage
   */
  offset: number;
  /**
   * Anzahl der Aufträge in der Ergebnismenge
   */
  limit: number;
  auftraege: Gutachtenauftrag[];
}

export interface Gutachter extends Person {
  readonly id?: string;
  readonly orgId?: string;
}

export interface Kontakt {
  typ?: 'Email' | 'Telefon';
  wert?: string;
  anmerkung?: string;
}

export interface Organisation {
  orgId: string;
  /**
   * IK-Nummer der Organisation
   */
  ik?: string;
  /**
   * KTAN ist die DRV-übergreifende eindeutige Nummer des Trägers
   */
  ktan?: string;
  /**
   * Praxisname Zeile 1
   */
  institutionsname1?: string;
  /**
   * Praxisname Zeile 2
   */
  institutionsname2?: string;
  zusatz?: string;
  adresse: Adresse;
}

export interface Person extends User {
  adressen?: Adresse[];
  anrede?: string;
  kontakte?: Kontakt[];
  nachname?: string;
  namenszusatz?: string;
  titel?: string;
  vorname?: string;
}

export interface Proband {
    vsnr?: string;
    geburtsdatum?: string;
    name?: string;
    vorname?: string;
    kontakte?: Array<Kontakt>;
    adresse?: Adresse;
}
export type RolleTyp = 'gutachter' | 'mitarbeiter' | 'admin';
export type StatusTyp = 'active' | 'locked' | 'unverified';

export interface User {
  //userid: string;
  created?: string;
  lastLogin?: string;
  rollen?: RolleTyp[];
  status?: StatusTyp;
}
