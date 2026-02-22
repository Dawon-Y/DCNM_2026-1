import { useNavigate, useLocation } from 'react-router-dom'
import { TOTAL_STAGES } from '../constants/Stages'
import successImage from '../assets/images/success.svg'

const SuccessPage: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { stageIndex = 0, score = 0 } = (location.state as { stageIndex: number; score: number }) ?? {}

    const isLastStage = stageIndex + 1 >= TOTAL_STAGES
    const nextStageIndex = stageIndex + 1

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-lg flex flex-col items-center gap-8">
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-800">
                    {stageIndex + 1}단계 성공!
                </h2>
                <img
                    src={successImage}
                    alt="성공"
                    className="w-44 h-44 md:w-56 md:h-56 object-contain"
                />
                <p className="text-xl md:text-2xl text-slate-700">다음 단계로 넘어가볼까요?</p>
                <div className="w-full flex justify-center">
                    {isLastStage ? (
                        <button
                            type="button"
                            onClick={() => navigate('/final', { state: { score }, replace: true })}
                            className="w-72 md:w-80 h-14 rounded-md bg-[#5B82B8] text-white text-lg font-medium hover:bg-[#4A6EA3] transition-colors"
                        >
                            다음으로
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={() => navigate('/game', { state: { stageIndex: nextStageIndex, score }, replace: true })}
                            className="w-72 md:w-80 h-14 rounded-md bg-[#5B82B8] text-white text-lg font-medium hover:bg-[#4A6EA3] transition-colors"
                        >
                            다음 단계로
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SuccessPage