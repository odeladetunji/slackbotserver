-- Table: public.chats

-- DROP TABLE public.chats;

CREATE TABLE public.chats
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    users text COLLATE pg_catalog."default",
    questions text COLLATE pg_catalog."default",
    answers text COLLATE pg_catalog."default",
    "createdAt" time without time zone,
    "updatedAt" time without time zone,
    CONSTRAINT chats_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.chats
    OWNER to postgres;