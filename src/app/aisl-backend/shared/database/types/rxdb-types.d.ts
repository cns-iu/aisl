/**
 * custom typings so typescript knows about the schema-fields
 * @type {[type]}
 */

import { Avatar } from './avatar';
import { Persona } from './persona';
import { Run, RxRunType } from './run';

import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { Observable } from 'rxjs';

export type RxAvatarDocument = RxDocument<Avatar>;
export type RxPersonaDocument = RxDocument<Persona>;
export type RxRunDocument = RxDocument<RxRunType>;

declare class RxAvatarCollection extends RxCollection<Avatar> {}
declare class RxPersonaCollection extends RxCollection<Persona> {}
declare class RxRunCollection extends RxCollection<RxRunType> {}

export class RxAislDatabase extends RxDatabase {
    avatar?: RxAvatarCollection;
    persona?: RxPersonaCollection;
    run?: RxRunCollection;
}

declare let _default: {
    RxAvatarCollection,
    RxPersonaCollection,
    RxRunCollection,
    RxAislDatabase
};
export default _default;
