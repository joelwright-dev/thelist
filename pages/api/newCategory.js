import prisma from "@/lib/prisma";

export default async function handle(req, res) {
    console.log(req.body)

    const category = await prisma.category.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            icon: "IconHeart"
        }
    })

    res.send({status: 200, message: JSON.stringify(category)})
}