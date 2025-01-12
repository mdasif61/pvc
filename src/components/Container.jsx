
const Container = ({children}) => {
    return (
        <div className="min-w-full bg-[url('/public/bg.jpg')] bg-cover bg-center min-h-screen mx-auto p-6">
            {children}
        </div>
    );
};

export default Container;