export interface Company {
  name: string;
  location: string;
  link: string;
  description: string;
  image?: string;
  showName: boolean;
}

export interface Position {
  title: string;
  type: string;
  startDate: Date;
  endDate?: Date;
  coreFunctionalities: string[];
  technologiesAndLanguages: string[];
}

export interface Experience {
  company: Company;
  positions: Position[];
}

export interface Education {
  startDate: Date;
  endDate?: Date;
  title: string;
  description: string;
  college: string;
  achievements: string[];
  icon?: string;
}

export interface Certificate {
  date: Date;
  title: string;
  description: string;
  origin: string;
  img: string;
  link?: string;
}

export interface Account {
  url: string;
  website: string;
  icon: string;
}

export interface About {
  profileImage: string;
  name: string;
  job: string;
  accounts: Account[];
  birthDate: Date;
  address: string;
  addressOnMap: string;
  languages: string[];
  whoAmI: string;
  emails: string[];
  phones: string[];
}

export default interface Profile {
  experiences: Experience[];
  skills: string[];
  educations: Education[];
  certifications: Certificate[];
  about: About;
}
