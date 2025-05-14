import { DynamicContent, DynamicHeader, DynamicGridCol } from "./DynamicGrid"
import Tag from "./Tag"

const Content = () => {
    return (
        <div className='flex flex-row w-full'>
            <DynamicGridCol />
            <div className='w-full flex flex-row'>
                <div className='flex-1 object-cover aspect-[3/2]'>
                    <img src="https://picsum.photos/600/400" alt="Random Image" />
                </div>
                <DynamicGridCol />
                <div className='flex-1 object-cover aspect-[3/2]'>
                    <img src="https://picsum.photos/600/400" alt="Random Image" />
                </div>            </div>
            <DynamicGridCol />
        </div>
    )
}

const ContentDescription = ({ title, tags, description }: { title: string, tags: string[], description: string }) => {
    return (
        <div className="flex flex-row gap-4">
            <div>
                <h4 className="mb-3 text-lg     text-style-title-lg">{title}</h4>
                <div className="flex gap-2">
                    {tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            </div>
            <div>{description}</div>
        </div>
    )
}

export const DemoSection = () => {
    return (
        <div className="max-w-screen-lg mx-auto">
            <div>
                <DynamicHeader row={2} />
                <Content />
                <DynamicHeader row={2} />
            </div>
            <div className="flex gap-8 w-full px-6">
                <div className="flex-1">
                    <ContentDescription
                        title="One Button Parser"
                        tags={["CONVENIENCE", "USABILITY"]}
                        description="Sample Text for a project description" />
                </div>
                <div className="flex-1">
                    <ContentDescription
                        title="One Button Parser"
                        tags={["CONVENIENCE", "USABILITY"]}
                        description="Sample Text for a project description" />
                </div>
            </div>
        </div>
    )
}