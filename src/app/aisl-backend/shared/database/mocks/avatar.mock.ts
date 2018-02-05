import { Avatar } from '../types/avatar';
import { AvatarFixtures } from '../fixtures/avatar.fixture';
import { randFromList } from '../../database-utils';

export function MockAvatar(source: 'fixture' | 'database' = 'fixture', db: any = null): Avatar {
  if (source == 'database' && db) {
    //FIXME: Pull from db
    return <Avatar>randFromList(AvatarFixtures);
  } else {
    return <Avatar>randFromList(AvatarFixtures);
  }
}
