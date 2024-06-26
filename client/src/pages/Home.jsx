import React from 'react';

const Home = () => {
  return (
    <div className="flex">
      {/* Left side (image) */}
      <div className="w-1/3 ">
        <img src="https://designerapp.officeapps.live.com/designerapp/document.ashx?path=/9ee1873d-bc37-4e54-b59a-9beb5a0f8539/DallEGeneratedImages/dalle-d0e8fb8b-0eb3-4167-8889-a5082770040a0251683147167477149000.jpg&dcHint=KoreaCentral&fileToken=7cabc60f-03a5-4583-9f67-b15ee9ca4712" alt="Image" className="h-auto w-full" />
      </div>
      
      {/* Right side (text) */}
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to my REDUX PROJECT </h1>
        <p className="text-lg leading-relaxed">
        Hi My name is GREESHMA B , 
       My project is a web application built with a focus on security and usability.
        It utilizes Redux for efficient global state management, ensuring seamless data
         flow across components. Authentication and authorization are handled through JWT,
          providing secure access to authenticated users and administrators. We've integrated
           a preferred database MongoDB to securely store and manage user data.On the user side, 
           the application features a straightforward login and registration process. After logging in, 
           users are directed to a home page where they can easily navigate to their profiles. 
           The user profile includes a file upload option for adding a personalized profile image.
        For administrators, there's a separate login interface granting access to administrative functionalities
         Admins can perform comprehensive searches on user data, as well as create, delete, and update user records as needed.
       Security is a top priority, with all sensitive data encrypted both in transit and at rest.
        Strict authorization controls ensure that only authorized users can access specific resources
         and perform permitted actions.Overall, my project aims to deliver a secure, scalable, and user-friendly 
         web application tailored for both user and administrative needs


        </p>
      </div>
    </div>
  );
};

export default Home;
