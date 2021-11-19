import Header from "./components/Header";
import Results from "./components/Results";

function moto() {
  return (
    <div className="bg-[#fafafa] h-screen">
      <Header />
      <Results type={"posts"} />
    </div>
  );
}

export default moto;
