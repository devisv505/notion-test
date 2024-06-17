import {mutation, query} from "@/convex/_generated/server";
import {v} from "convex/values";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        return await ctx.db.query("documents").collect();
    }
});

export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("documents"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;
        return await ctx.db.insert("documents", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId: userId,
            isArchived: false,
            isPublished: false,
        });
    }
});

export const getById = query({
    args: {documentId: v.id("documents")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        const document = await ctx.db.get(args.documentId)

        if (!document) {
            throw new Error("Not found");
        }

        if (document.isPublished && document.isArchived) {
            return document;
        }

        if (!identity) {
            throw new Error("Not authenticated");
        }

        if (document.userId !== identity.subject) {
            throw new Error("Unauthorized");
        }

        return document;
    }
});

export const update = mutation({
    args: {
        id: v.id("documents"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icons: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;
        const {id, ...rest} = args

        const existingDocument = await ctx.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized");
        }

        return await ctx.db.patch(args.id, {
            ...rest
        })
    }
});

