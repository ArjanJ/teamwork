import { TeamMember } from '../teams/types';
import { getUserWhere } from '../users/models';
import { UserCompany } from '../users/types';

export const inviteUsers = async (
  company: UserCompany,
  users: TeamMember[],
) => {
  // Get all users in company
  const userDocs = await getUserWhere('companies', company);

  if (userDocs.docs.length > 0) {
    const usersInCompany = userDocs.docs.map(u => u.data());
  }
};
