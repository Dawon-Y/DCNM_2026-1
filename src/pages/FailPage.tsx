import { useNavigate, useLocation } from 'react-router-dom'
import failImage from '../assets/images/fail.svg'

const FailPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { stageIndex = 0, score = 0, reason = 'wrong' } = (location.state as { stageIndex: number; score: number; reason: string }) ?? {}

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-lg flex flex-col items-center gap-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">{stageIndex + 1}단계 실패</h2>
                <img
                    src={failImage}
                    alt="실패"
                    className="w-44 h-44 md:w-56 md:h-56 object-contain"
                />
                <p className="text-xl md:text-2xl text-slate-700">앗 아쉬워요 ㅠ.ㅠ</p>
                <div className="w-full flex justify-center">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-72 md:w-80 h-14 rounded-md bg-[#5B82B8] text-white text-lg font-medium hover:bg-[#4A6EA3] transition-colors"
                    >
                        처음으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FailPage