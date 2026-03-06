const About = () => {
  return (
    <section id="about" className="py-24 bg-gray-100 dark:bg-dark-light relative transition-colors duration-300">
      <div className="container">
        <h2 className="section-title dark:text-white">About Me</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mt-12">
          <div className="flex-1 flex justify-center items-center">
            <div className="relative w-[350px] h-[375px] rounded-full overflow-hidden shadow-xl">
              <div className="absolute -inset-2.5 bg-gradient-primary -rotate-6 z-[-1] rounded-[25px]"></div>
              {/* Replace with your own image */}
              <img
                src="https://wzmpiaqjnegnitfnahue.supabase.co/storage/v1/object/public/resumes/profile.png"
                alt="Profile"
                className="w-full h-full object-cover object-center rounded-[20px] transition-all duration-300"
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Komlo megheder ojon  */}
            </div>
          </div>
          <div className="flex-[1.5] text-slate-600 dark:text-gray-300">
            <h3 className="text-primary text-3xl mb-6">Who am I?</h3>
            <p className="mb-6 text-lg leading-relaxed">
              I am a passionate Full Stack Developer with expertise in building modern web applications.
              With a strong foundation in both frontend and backend technologies, I create seamless,
              user-friendly experiences that solve real-world problems.
            </p>
            <p className="mb-6 text-lg leading-relaxed">
              My journey in software development began several years ago, and since then, I've worked on various
              projects ranging from small business websites to complex web applications. I'm constantly learning
              and exploring new technologies to enhance my skill set.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
              <div className="flex items-center">
                <strong className="text-slate-800 dark:text-white mr-2.5">Name:</strong> Subham Mondal
              </div>
              <div className="flex items-center">
                <strong className="text-slate-800 dark:text-white mr-2.5">Email:</strong> sjxsubham@gmail.com
              </div>
              <div className="flex items-center">
                <strong className="text-slate-800 dark:text-white mr-2.5">Location:</strong> Kolkata, India
              </div>
              <div className="flex items-center">
                <strong className="text-slate-800 dark:text-white mr-2.5">Status:</strong> Available for work
              </div>
            </div>
            <a href="" className="btn btn-primary ">Download Resume</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
