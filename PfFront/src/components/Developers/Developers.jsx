import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const people = [
  {
    name: "Jose Nicolas Villagra",
    role: "Front-End Developer",
    email: "villagrajosenicolas@gmail.com",
    imageUrl: "/developer1.JPG",
    linkedin: "https://www.linkedin.com/in/jose-nicolas-villagra-83332a242/",
    GitHub: "https://github.com/NicolasVillagra",
  },
  {
    name: "Bryan Arley Chica Gutiérrez",
    role: "Ingeniero Electrónico - Full Stack Web Developer",
    email: "Bryany8@hotmail.com - Bryany899@gmail.com",
    imageUrl: "/Bryan.jpg",
    linkedin: "https://www.linkedin.com/in/bryan-arley-chica-gutierrez/",
    GitHub: "https://github.com/BACHICAG",
  },
  {
    name: "Matias Ezequiel Golubeff",
    role: "Full Stack Web Developer",
    email: "matiasgolubeff7@gmail.com ",
    imageUrl: "/Mati.jpg",
    linkedin: "https://www.linkedin.com/in/matias-golubeff-b89a17277/",
    GitHub: "https://github.com/MatiasGolubeff7",
  },
  {
    name: 'Diego Sierra',
      role: 'Front-End Developer',
      email: 'diegosierra@cityciudad.com',
      imageUrl:
        '/Diego.jpg',
      linkedin:"https://www.linkedin.com/in/diego-sierra-398627227/",
      GitHub:"https://github.com/diegosierra-city"
  },
  {
    name: "Juan Bautista María Beck",
    role: "Back-End Developer",
    email: "juanbautistabeck@gmail.com",
    imageUrl: "/FotodeperfilLinkedin.png",
    linkedin: "https://www.linkedin.com/in/juan-bautista-maría-beck",
    GitHub: "https://github.com/JBautistaBeck",
  },
  {
    name: "Rocio Cosme Yonemitsu",
    role: "Back-End Developer",
    email: "rcosme85@hotmail.com",
    imageUrl:
      "https://s3-pf40a.s3.sa-east-1.amazonaws.com/Imagenes-Readme/FOTO-RC-11-2.jpg",
    linkedin: "https://www.linkedin.com/in/rocio-cosme-yonemitsu",
    GitHub: "https://github.com/rcosme85",
  },
  {
    name: "Juan Fernando Muñoz",
    role: "Full-stack Developer",
    email: "juanmunozvillamizar@gmail.com",
    imageUrl: "/fotojuan.png",
    linkedin: "TU LINKEDIN AQUI",
    GitHub: "https://github.com/JFernandoMunoz",
  },
  {
    name: "Zubair Ali Lanuscou",
    role: "Full-stack Developer",
    email: "zubairalilanuscou@gmail.com",
    imageUrl: "/zubair.jpg",
    linkedin: "www.linkedin.com/in/zubair-lanuscou-896375275",
    GitHub: "https://github.com/ZLanuscou",
  },

  // More people...
];
  
  export default function Developers() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Equipo de desarrolladores.</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            Nuestro talentoso equipo de desarrollo está conformado por ocho apasionados profesionales de la tecnología, divididos equitativamente entre cuatro expertos en el desarrollo back-end y cuatro especialistas en el desarrollo front-end. Juntos, fusionamos la creatividad y la lógica para crear soluciones digitales innovadoras y altamente funcionales. Nuestra colaboración sinérgica garantiza que podamos diseñar y construir aplicaciones web y sistemas robustos que no solo cautivan visualmente, sino que también funcionan de manera eficiente en su núcleo. Estamos comprometidos con la excelencia en cada línea de código y en cada detalle de diseño, con el objetivo de superar las expectativas de nuestros clientes y usuarios finales.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-52 w-44 object-cover rounded-full" src={person.imageUrl} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.role}</p>
                    <p className="text-sm font-semibold leading-6 text-indigo-600">{person.email}</p>
                    <a href={person.linkedin} className="text-sm font-semibold leading-6 text-indigo-600"><LinkedInIcon /> Linkedin</a>
                    <br />
                    <a href={person.GitHub} className="text-sm font-semibold leading-6 text-indigo-600"><GitHubIcon /> GitHub</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  