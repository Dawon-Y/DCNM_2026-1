import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
        <img src={logo} alt="logo" className="w-[23%]" />
        <p className="text-[#3B6CA4] text-2xl text-center mt-10">
            <p className="text-3xl font-bold mb-3">
            DC&M은 컴퓨터공학부 학술 동아리입니다.
            </p>
            <p className="text-xl text-[#85add9]">
            해당 게임은 동아리 박람회를 위해 만들어졌습니다.
            </p>
            <p className="text-xl text-[#85add9]">
            게임은 총 <b>5단계</b>까지 구성되어 있습니다.
            </p>
        </p>

        <button
            type="button"
            onClick={() => navigate("/game")}
            className="w-95 h-14 bg-[#5985B1] text-white text-xl rounded-lg mt-15 hover:bg-[#3B6CA4] transition-colors duration-300"
        >
            게임 시작
        </button>
        </div>
    );
};

export default MainPage;
