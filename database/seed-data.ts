
interface SeedData {
  entries: SeedEntry[];
}


interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pendiente: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, eum. Aperiam id quaerat veniam, tenetur, sunt repudiandae qui nostrum delectus aliquam quos dolor illo nam',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'En progreso: Sunt repudiandae qui nostrum delectus aliquam quos dolor illo nam',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Finalizada: Error, eum. Aperiam id quaerat veniam, tenetur, sunt repudiandae qui nostrum delectus aliquam quos dolor illo nam',
      status: 'finished',
      createdAt: Date.now() - 100000
    }
  ]
}