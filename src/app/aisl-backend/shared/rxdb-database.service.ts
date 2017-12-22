import { Injectable } from '@angular/core';
import * as RxDBTypes from './database/types/rxdb-types.d';

import * as LocalStorageAdapter from 'pouchdb-adapter-localstorage';
import * as WebSQLAdapter from 'pouchdb-adapter-websql';
import * as IdbAdapter from 'pouchdb-adapter-idb';
import * as MemoryAdapter from 'pouchdb-adapter-memory';
import * as HttpAdapter from 'pouchdb-adapter-http';

import { AvatarSchema } from './database/schemas/avatar.schema';
import { PersonaSchema } from './database/schemas/persona.schema';
import { RunSchema } from './database/schemas/run.schema';

import { Avatar } from "./database/types/avatar";
import { Persona } from "./database/types/persona";
import { Run, RxRunType } from "./database/types/run";

// batteries-included
import RxDB from 'rxdb';
import { RxDocument } from 'rxdb';

/**
 * custom build
 */
// import RxDB from 'rxdb/plugins/core';

// import modules
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
if (true) { //ENV === 'development') {
    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule);
}

import RxDBValidateModule from 'rxdb/plugins/validate';
RxDB.plugin(RxDBValidateModule);
import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';
RxDB.plugin(RxDBLeaderElectionModule);

import RxDBReplicationModule from 'rxdb/plugins/replication';

RxDB.plugin(RxDBReplicationModule);
// always needed for replication with the node-server
RxDB.plugin(HttpAdapter);


RxDB.QueryChangeDetector.enable();
RxDB.QueryChangeDetector.enableDebugging();

const adapters = {
    localstorage: LocalStorageAdapter,
    websql: WebSQLAdapter,
    idb: IdbAdapter,
    memory: MemoryAdapter
};

const useAdapter = 'idb';
RxDB.plugin(adapters[useAdapter]);

async function RxRunTypeAsRun(rxRun: RxDocument<RxRunType>): Promise<Run> {
  const avatar: Avatar = await rxRun.populate('avatar');
  const persona: Persona = await rxRun.populate('persona');
  const timestamp = new Date(rxRun.timestamp);

  return <Run>{
    avatar, persona, timestamp,
    lane: rxRun.lane,
    started: rxRun.started,
    falseStart: rxRun.falseStart,
    timeMillis: rxRun.timeMillis
  }
}

let collections = [
    {
        name: 'avatar',
        schema: AvatarSchema,
        sync: true
    },
    {
        name: 'persona',
        schema: PersonaSchema,
        sync: true
    },
    {
        name: 'run',
        schema: RunSchema,
        sync: true,
        methods: {
            asRun() {
              return RxRunTypeAsRun(this);
            }
        },
    },
];

console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://' + window.location.hostname + ':10101/';

let doSync = false;
if (window.location.hash == '#nosync') doSync = false;

@Injectable()
export class RxdbDatabaseService {
  static dbPromise: Promise<RxDBTypes.RxAislDatabase> = null;
  private async _create(): Promise<RxDBTypes.RxAislDatabase> {
    console.log('DatabaseService: creating database..');
    const db: RxDBTypes.RxAislDatabase = await RxDB.create({
      name: 'aisl',
      adapter: useAdapter,
      // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    window['db'] = db; // write to window for debugging
    // show leadership in title
    db.waitForLeadership()
      .then(() => {
        console.log('isLeader now');
        document.title = '♛ ' + document.title;
      });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map(colData => db.collection(colData)));

    // sync
    console.log('DatabaseService: sync');
    collections
      .filter(col => col.sync)
      .map(col => col.name)
      .forEach(colName => db[colName].sync({ remote: syncURL + colName + '/' }));

    return db;
  }

  get(): Promise<RxDBTypes.RxAislDatabase> {
    if (RxdbDatabaseService.dbPromise)
        return RxdbDatabaseService.dbPromise;

    // create database
    RxdbDatabaseService.dbPromise = this._create();
    return RxdbDatabaseService.dbPromise;
  }

}
