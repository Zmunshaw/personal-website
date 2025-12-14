import { contentfulClient } from '../lib/contentful';
import { ProjectDetails } from '../Types/ProjectTypes';
import { Entry, EntrySkeletonType } from 'contentful';
import { projects as mockProjects } from '../testing/mocks/projects';

interface ContentfulAsset {
    fields: {
        file?: {
            url?: string;
        };
    };
}

interface ContentfulTechnology extends EntrySkeletonType {
    contentTypeId: 'technology';
    fields: {
        name: string;
        description?: string;
        icon?: ContentfulAsset;
        url?: string;
    };
}

interface ContentfulProjectType extends EntrySkeletonType {
    contentTypeId: 'projectType';
    fields: {
        name: string;
        description: string;
        information: string;
        icon?: ContentfulAsset;
    };
}

interface ContentfulProjectCategory extends EntrySkeletonType {
    contentTypeId: 'projectCategory';
    fields: {
        name: string;
        description: string;
        icon?: ContentfulAsset;
    };
}

interface ContentfulProjectAttribute extends EntrySkeletonType {
    contentTypeId: 'projectAttribute';
    fields: {
        name: string;
        description: string;
        icon?: ContentfulAsset;
    };
}

interface ContentfulProject extends EntrySkeletonType {
    contentTypeId: 'porfolioProjects';
    fields: {
        projectId: number;
        projectName: string;
        icon: ContentfulAsset;
        shortDescription?: any;
        longDescription?: any;
        repository?: string;
        demo?: string;
        projectType?: Entry<ContentfulProjectType>;
        projectCategory?: Entry<ContentfulProjectCategory>;
        projectAttributes?: Entry<ContentfulProjectAttribute>[];
        projectTechs?: Entry<ContentfulTechnology>[];
    };
}

function extractTextFromRichText(richText: any): string {
    if (!richText || !richText.content) return '';

    return richText.content
        .map((node: any) => {
            if (node.nodeType === 'paragraph' && node.content) {
                return node.content
                    .map((item: any) => item.value || '')
                    .join('');
            }
            return '';
        })
        .join(' ');
}

export async function fetchProjects(): Promise<ProjectDetails[]> {
    try {
        // Check if Contentful is configured
        if (!process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
            !process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
            process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN === 'your_access_token_here') {
            console.warn('Contentful not configured, using mock data');
            return mockProjects;
        }

        const response = await contentfulClient.getEntries({
            content_type: 'porfolioProjects',
        });

        if (!response.items || response.items.length === 0) {
            console.warn('No projects found in Contentful, using mock data');
            return mockProjects;
        }

        return response.items.map((item) => {
            const fields = item.fields as any;
            const iconUrl = fields.icon?.fields?.file?.url;

            return {
                id: fields.projectId.toString(),
                name: fields.projectName,
                description: fields.shortDescription
                    ? extractTextFromRichText(fields.shortDescription)
                    : '',
                repository: fields.repository || '',
                demo: fields.demo || '',
                icon: {
                    isImage: true,
                    src: iconUrl ? `https:${iconUrl}` : '',
                },
                type: fields.projectType ? {
                    id: fields.projectType.sys.id,
                    name: fields.projectType.fields.name || '',
                    description: fields.projectType.fields.description || '',
                    information: fields.projectType.fields.information || '',
                    icon: {
                        isImage: false,
                    },
                } : undefined,
                attributes: fields.projectAttributes?.map((attr: any) => ({
                    id: attr.sys.id,
                    name: attr.fields.name || '',
                    description: attr.fields.description || '',
                    icon: {
                        isImage: false,
                    },
                })),
                categories: fields.projectCategory ? {
                    name: fields.projectCategory.fields.name || '',
                    description: fields.projectCategory.fields.description || '',
                    icon: {
                        isImage: false,
                    },
                } : undefined,
                techs: fields.projectTechs?.map((tech: any) => {
                    const techIconUrl = tech.fields.icon?.fields?.file?.url;
                    const techDescription = typeof tech.fields.description === 'string'
                        ? tech.fields.description
                        : tech.fields.description
                            ? extractTextFromRichText(tech.fields.description)
                            : '';
                    return {
                        id: tech.sys.id,
                        name: tech.fields.name || '',
                        description: techDescription,
                        icon: {
                            isImage: true,
                            src: techIconUrl ? `https:${techIconUrl}` : '',
                        },
                        url: tech.fields.url || '',
                    };
                }),
            };
        });
    } catch (error) {
        console.error('Error fetching projects from Contentful:', error);
        console.warn('Falling back to mock data');
        return mockProjects;
    }
}
