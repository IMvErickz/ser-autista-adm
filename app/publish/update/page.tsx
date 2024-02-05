import { Table } from "@/components/Table/Table"
import { useRouter } from "next/router"

export default function UpdatePublish() {
    return (
        <section className="w-full h-full flex flex-col items-center justify-center py-10 gap-y-8">
            <header className="w-full flex items-center justify-center pt-10">
                <h1 className="text-blue-450 font-bold text-4xl">
                    Alterar publicação
                </h1>
            </header>

            <div className="w-full flex items-center justify-center px-10">
                <Table path="update" />
            </div>
        </section>
    )
}