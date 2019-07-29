import { db } from '../../../config/firebase';
import { TEAMS_COLLECTION } from '../constants';
import { TeamMember } from '../types';

export const UPDATE_TEAM_MEMBERS = 'UPDATE_TEAM_MEMBERS';

export const deleteTeam = async (id: string, members: TeamMember[]) =>
  await db
    .collection(TEAMS_COLLECTION)
    .doc(id)
    .update({ members });
