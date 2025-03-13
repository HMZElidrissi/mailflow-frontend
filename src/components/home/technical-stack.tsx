const stackItems = [
  {
    category: 'Backend',
    technologies: 'Maven, Spring Boot 3, PostgreSQL, Redis, Microservice architecture, Eureka, Spring Cloud, Mapstruct'
  },
  {
    category: 'Frontend',
    technologies: 'React, Redux Toolkit, TailwindCSS'
  },
  {
    category: 'Infrastructure',
    technologies: 'Docker, Jenkins'
  }
];

export function TechnicalStack() {

  return (
    <div className="space-y-6">
      {stackItems.map((item, index) => (
        <div key={index}>
          <h3 className="mb-2 flex items-center gap-2 text-lg font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-orange-500"></span>
            {item.category}
          </h3>
          <p className="ml-4 text-muted-foreground">
            {item.technologies}
          </p>
        </div>
      ))}
    </div>
  );
}