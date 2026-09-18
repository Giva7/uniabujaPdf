import { useState } from "react"

interface SignInProps {
    onSignInSuccess: (user: { id: string; name: string; matricNumber: string; role?: string }) => void;
    onCreateAccountClick: () => void;
}

export function SignIn({  onSignInSuccess, onCreateAccountClick }: SignInProps) {
    const [matricNumber, setMatricNumber] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch("https://uniabuja-vault-api.ichapijeff.workers.dev/api/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ 
        matricNumber: matricNumber.trim().toUpperCase(), 
        password: password.trim() 
    })
        })

            const data = await res.json()


            if (res.ok && data.success) {
                localStorage.setItem("vault_user", JSON.stringify(data.user))
                onSignInSuccess(data.user)
            } else {
                setError(data.error || "Invalid login credentials")
            }
        } catch (err) {
            setError(`sign in failed ${err}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Sign In</h2>
            {error && <div className="p-2 mb-4 text-sm text-red-600 bg-red-50 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    required
                    placeholder="Matriculation Number"
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <div className="mt-4 text-sm text-center">
                <span>Don't have an account? </span>
                <button onClick={onCreateAccountClick} className="text-green-600 font-semibold underline">
                    Sign Up
                </button>
            </div>
        </div>
    )
}