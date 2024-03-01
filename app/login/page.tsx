export default function login(){
    return (
        <section className="w-1/2 mx-auto py-14 bg-white my-10 text-sm border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-sm">
        <h1 className="text-2xl font-semibold mb-3 text-center">Create your account</h1>
       
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="email">Email Address</label>
        <input className="block border-2 p-2 w-full" placeholder="someone@mail.com" type="email" name="email" id="email" />
        </div>
        <div className="mb-3 w-1/2 mx-auto">
        <label className="text-xs mb-4" htmlFor="password">Password</label>
        <input className="block border-2 p-2 w-full" placeholder="********" type="password" name="password" id="password" />
        </div>
    
        <div className="mb-3 w-1/2 mx-auto">
       <button className="bg-blue-500 w-full text-white p-3">Create Account</button>
        </div>
        <p className="text-xs mb-2 w-1/2 mx-auto">
          Forgot Password ? <span className="text-blue-800 hover:underline hover:cursor-pointer">Click here</span> </p>
        </section>
    );
}