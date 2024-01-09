import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    console.log(req.body)

    const item = await prisma.item.delete({
        where: {
            id: req.body.id
        }
    })

    res.send({status: 200})
}