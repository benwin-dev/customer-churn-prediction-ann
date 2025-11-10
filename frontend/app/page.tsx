import ChurnPredictionForm from "./components/ChurnPredictionForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-start py-12 px-4 sm:px-8 bg-white dark:bg-black">
        <ChurnPredictionForm />
      </main>
    </div>
  );
}
