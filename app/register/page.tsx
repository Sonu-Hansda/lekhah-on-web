export default function register(){
    return(
        <section className="w-1/2 mx-auto py-14 bg-white my-10 text-sm  border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h1 className="text-2xl font-semibold mb-3 text-center">Create your account</h1>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="fname">First name</label>
        <input className="block border-2 p-2 w-full" type="text" name="email" id="email" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="lname">Last name</label>
        <input className="block border-2 p-2 w-full" type="text" name="email" id="email" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="gender">Gender</label>
        <select className="block border-2 p-2 w-full" name="gender" id="gender" >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
        </select>
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="email">Email Address</label>
        <input className="block border-2 p-2 w-full" placeholder="someone@mail.com" type="email" name="email" id="email" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="password">Password</label>
        <input className="block border-2 p-2 w-full" placeholder="********" type="password" name="password" id="password" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="cpassword">Confirm Password</label>
        <input className="block border-2 p-2 w-full" placeholder="********" type="password" name="cpassword" id="cpassword" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <p className="text-xs mb-2">
           By clicking on "create account" button you agree to our terms and conditions. </p>
       <button className="bg-blue-500 w-full text-white p-3">Create Account</button>
        </div>
        </section>
    );
}