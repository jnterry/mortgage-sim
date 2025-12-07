export default function Card({ children, className = '' }) {
	return (
		<div className={`p-4 bg-white rounded-lg shadow-xl border border-gray-200 border-2 ${className}`}>
			{children}
		</div>
	)
}