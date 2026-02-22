import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import celebrageImage from '../assets/images/celebrate.jpeg'
import QrCode from '../assets/images/qr.png'
import promoVideo from '../assets/video/dcnm.mp4'

type FinalStep = 'celebrate' | 'recruit'

const FinalPage: React.FC = () => {
	const navigate = useNavigate()
	const location = useLocation()
	void location
	const [step, setStep] = useState<FinalStep>('celebrate')

	const headline = useMemo(() => {
		if (step === 'celebrate') {
			return '축하드려요! 모든 단계를 전부 성공했어요!'
		}
		return '코드 오탈자를 잘 보실 것 같네요!\n저희 동아리와 함께 하실래요?'
	}, [step])

	const isCelebrate = step === 'celebrate'

	return (
		<div className="min-h-screen bg-white flex items-center justify-center px-6 py-12">
			<div className="w-full max-w-3xl flex flex-col items-center gap-10 text-center">
				<h2 className="text-2xl md:text-3xl font-semibold text-slate-800 whitespace-pre-line">
					{headline}
				</h2>

				{isCelebrate ? (
					<div className="w-full max-w-[650px] aspect-video bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 text-lg overflow-hidden">
						<img src={celebrageImage} alt="Celebration" className="w-full h-full object-cover" />
					</div>
				) : (
					<div className="w-full max-w-[650px] aspect-video rounded-lg overflow-hidden bg-slate-200">
						<video
							src={promoVideo}
							className="w-full h-full object-cover"
							autoPlay
							loop
							playsInline
							controls
							muted
						/>
					</div>
				)}

				{isCelebrate ? (
					<button
						type="button"
						onClick={() => setStep('recruit')}
						className="w-72 md:w-80 h-14 rounded-md bg-[#5B82B8] text-white text-lg font-medium hover:bg-[#4A6EA3] transition-colors mt-6"
					>
						다음으로
					</button>
				) : (
					<div className="w-full flex flex-col items-center gap-6">
						<div className="w-72 md:w-80 px-2 flex items-center justify-between text-slate-700">
							<p className="text-md lg:text-base text-right leading-snug">
								DC&M 신입 부원 모집 중!<br />지원하러 가기 →
							</p>
							<img src={QrCode} alt="QR Code" className="w-25 h-25 md:w-20 md:h-20" />
						</div>
						<button
							type="button"
							onClick={() => navigate('/', { replace: true })}
							className="w-72 md:w-80 h-14 rounded-md bg-[#5B82B8] text-white text-lg font-medium hover:bg-[#4A6EA3] transition-colors mt-6"
						>
							처음으로
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default FinalPage
