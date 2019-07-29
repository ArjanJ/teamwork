export interface Company {
  name: string;
  owner: CompanyOwner;
}

interface CompanyOwner {
  firstName: string;
  email: string;
  lastName: string;
}
