export interface Company {
  id: string;
  name: string;
  owner: CompanyOwner;
}

interface CompanyOwner {
  firstName: string;
  email: string;
  lastName: string;
}
