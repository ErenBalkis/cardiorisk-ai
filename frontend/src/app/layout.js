import "./globals.css";

export const metadata = {
  title: "CardioRisk AI — Heart Attack Risk Analysis",
  description:
    "Analyze your heart health using machine learning. Get instant cardiovascular risk assessment powered by a Logistic Regression model trained on clinical data.",
  keywords: ["heart attack", "risk analysis", "machine learning", "AI", "cardiovascular", "health"],
  authors: [{ name: "CardioRisk AI" }],
  openGraph: {
    title: "CardioRisk AI — Heart Attack Risk Analysis",
    description: "AI-powered cardiovascular risk assessment tool",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="noise-overlay min-h-screen bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
