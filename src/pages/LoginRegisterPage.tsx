const LoginRegisterPage = () => {
    return (
        <div>
            <h1 className="loginRegister">Login/Register</h1>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
    );
}
export default LoginRegisterPage;