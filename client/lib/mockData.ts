export interface Concept {
  slug: string;
  title?: string;
  domain?: string;
  summary?: string;
  mental_model?: string;
  core_mechanism?: string[];
  when_to_use?: string[];
  compare?: Array<{
    target?: string;
    concept?: string;
    difference?: string;
  }>;
  definition?: string;
  mentalModel?: string;
  mechanism?: string[];
  whenToUse?: string[];
  relations?: Array<{
    type?: string;
    relation_type?: string;
    target: string;
    targetLabel?: string;
  }>;
  learningLogs?: Array<{
    date?: string;
    topic?: string;
    trigger?: string;
    updated_understanding?: string;
    updatedUnderstanding?: string;
    updatedModel?: string;
  }>;
  breadcrumb?: string[];
}

export const mockConcepts: Concept[] = [
  {
    slug: "api",
    title: "API (Application Programming Interface)",
    domain: "System Design > Communication",
    summary: "A set of rules that allow different software components to communicate.",
    definition:
      "An API (Application Programming Interface) is a contract that defines how different software components can interact with each other. It specifies the methods, data formats, and protocols that clients must use to request services from a server.",
    mentalModel:
      "API is like a restaurant menu. You don't need to know how the kitchen works; you just order from the menu (API endpoints), and the chef (server) prepares your food and delivers it.",
    mechanism: [
      "Client sends HTTP request with method (GET, POST, PUT, DELETE)",
      "Server receives request and routes it to appropriate handler",
      "Handler processes business logic and queries database if needed",
      "Server serializes response (usually JSON) and sends back to client",
      "Client receives and parses response data",
    ],
    whenToUse: [
      "You need to expose functionality for external systems to use",
      "Building a distributed system where components are decoupled",
      "Creating mobile apps or web clients that need backend data",
      "You want versioning and backward compatibility",
    ],
    compare: [
      {
        concept: "Message Queue",
        difference:
          "API is synchronous (request-response), while queues are asynchronous. Use API for real-time data; use queues for long-running tasks.",
      },
      {
        concept: "Webhook",
        difference:
          "API = client pulls data. Webhook = server pushes events to client. APIs for on-demand data; webhooks for reactive systems.",
      },
    ],
    relations: [
      { type: "used-with", target: "message-queue", targetLabel: "Message Queue" },
      { type: "alternative-to", target: "rpc", targetLabel: "RPC" },
    ],
    breadcrumb: ["System Design", "Communication"],
    learningLogs: [
      {
        date: "2024-01-15",
        trigger: "Confusion about statelessness in REST APIs",
        updatedModel:
          "Each request is independent; server doesn't store client state. This makes APIs scalable but requires clients to send all necessary context.",
      },
      {
        date: "2024-02-03",
        trigger: "Why use API versioning?",
        updatedModel:
          "Versioning allows backward compatibility. Old clients keep using v1, new clients use v2. Prevents breaking changes.",
      },
    ],
  },
  {
    slug: "message-queue",
    title: "Message Queue",
    domain: "System Design > Communication",
    summary:
      "A system that allows asynchronous communication between different services.",
    definition:
      "A message queue is a form of asynchronous service-to-service communication used in microservices architectures. Messages sent to a queue are stored and processed by consumers at their own pace.",
    mentalModel:
      "Think of a message queue like a postal service. You drop a letter (message) in a mailbox. The postal service (queue broker) stores it and delivers it when the recipient is ready to receive it.",
    mechanism: [
      "Producer creates a message and sends it to the queue",
      "Queue broker stores the message persistently",
      "Consumer connects to queue and retrieves messages",
      "Consumer processes the message and sends an acknowledgment",
      "Queue removes the message after acknowledgment",
    ],
    whenToUse: [
      "You have long-running tasks that don't need immediate response",
      "You want to decouple services and handle spikes in load",
      "You need to retry failed operations reliably",
      "You want to process data in the background without blocking users",
    ],
    compare: [
      {
        concept: "API",
        difference:
          "Queue is asynchronous; API is synchronous. Use queues when you don't need immediate response.",
      },
      {
        concept: "Pub/Sub",
        difference:
          "Queue = one consumer processes message. Pub/Sub = multiple consumers receive same message.",
      },
    ],
    relations: [
      { type: "alternative-to", target: "api", targetLabel: "API" },
      { type: "related-to", target: "database", targetLabel: "Database" },
    ],
    breadcrumb: ["System Design", "Communication"],
    learningLogs: [
      {
        date: "2024-01-20",
        trigger: "Website slow when sending emails after user signup",
        updatedModel:
          "Use a queue: signup saves user (fast), queues email task, email service processes later. Doesn't block user.",
      },
    ],
  },
  {
    slug: "docker",
    title: "Docker",
    domain: "System Design > Infrastructure",
    summary: "Container technology that packages applications with their dependencies.",
    definition:
      "Docker is a containerization platform that packages an application and all its dependencies (code, runtime, libraries) into a standardized unit called a container. Containers are lightweight, portable, and ensure consistency across development, testing, and production.",
    mentalModel:
      "Docker is like shipping containers. A shipping container (Docker image) holds everything the application needs. You can move the container from your laptop to the server without worrying if dependencies match.",
    mechanism: [
      "You write a Dockerfile specifying base image, dependencies, and commands",
      "Docker builds an image from the Dockerfile",
      "You push the image to a registry (Docker Hub, private registry)",
      "On any machine, pull the image and run it as a container",
      "Container runs in isolation with its own filesystem and environment",
    ],
    whenToUse: [
      "You want consistency between dev, staging, and production",
      "You're deploying microservices and need easy scaling",
      "You want to avoid 'works on my machine' problems",
      "You need to run multiple isolated applications on one server",
    ],
    compare: [
      {
        concept: "Virtual Machine",
        difference:
          "Docker = lightweight, shares OS kernel. VM = heavyweight, runs full OS. Docker starts faster and uses less resources.",
      },
      {
        concept: "Kubernetes",
        difference:
          "Docker = containerization tool. Kubernetes = orchestration platform. Use Docker to build images; use K8s to manage multiple containers.",
      },
    ],
    relations: [
      { type: "used-with", target: "kubernetes", targetLabel: "Kubernetes" },
      { type: "comparison", target: "vm", targetLabel: "Virtual Machines" },
    ],
    breadcrumb: ["System Design", "Infrastructure"],
  },
  {
    slug: "database",
    title: "Database",
    domain: "System Design > Infrastructure",
    summary: "Persistent storage system for structured or unstructured data.",
    definition:
      "A database is an organized collection of structured data or information that is stored and accessed electronically. Databases enable efficient querying, updating, and retrieving of data.",
    mentalModel:
      "A database is like a well-organized library. Each book (record) has metadata (fields). A librarian (database engine) finds books quickly using an index system.",
    mechanism: [
      "Data is organized in tables (SQL) or collections (NoSQL)",
      "Each record has fields/properties",
      "Indexes speed up data retrieval",
      "Queries are executed by the database engine",
      "ACID properties ensure data consistency and reliability",
    ],
    whenToUse: [
      "You need persistent storage across application restarts",
      "You have structured data with relationships",
      "You need to query data efficiently",
      "Data consistency and integrity are important",
    ],
    compare: [
      {
        concept: "Cache",
        difference:
          "Database = persistent, reliable. Cache = fast, temporary. Use database for authoritative data; cache for speed.",
      },
      {
        concept: "File Storage",
        difference:
          "Database = queryable, structured. File storage = simple, unstructured. Use database for data with relationships.",
      },
    ],
    relations: [
      { type: "related-to", target: "api", targetLabel: "API" },
      { type: "used-with", target: "docker", targetLabel: "Docker" },
    ],
    breadcrumb: ["System Design", "Infrastructure"],
  },
  {
    slug: "rpc",
    title: "RPC (Remote Procedure Call)",
    domain: "System Design > Communication",
    summary:
      "Protocol that allows a program to request a service from another program on the network.",
    definition:
      "RPC is a protocol that enables a program to call a function or procedure on a remote server as if it were local, abstracting away network communication details.",
    mentalModel:
      "RPC is like making a local function call, but the function runs on a remote computer. You call it with arguments and get back results.",
    mechanism: [
      "Client calls a remote function with arguments",
      "Arguments are serialized and sent over the network",
      "Server receives the request and executes the function",
      "Result is serialized and sent back to client",
      "Client deserializes and uses the result",
    ],
    whenToUse: [
      "You have internal service-to-service communication",
      "You want strongly typed interfaces between services",
      "You need high-performance communication between services",
    ],
    breadcrumb: ["System Design", "Communication"],
  },
  {
    slug: "kubernetes",
    title: "Kubernetes",
    domain: "System Design > Infrastructure",
    summary: "Container orchestration platform for managing containerized applications.",
    definition:
      "Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications across clusters of machines.",
    mentalModel:
      "Kubernetes is like an orchestra conductor. You define what you want (services, replicas, resources), and Kubernetes manages the details (scheduling, networking, scaling).",
    mechanism: [
      "You define Deployments specifying desired state",
      "Kubernetes scheduler places pods on nodes",
      "Control plane monitors actual vs desired state",
      "If a pod dies, Kubernetes replaces it automatically",
      "Load balancer routes traffic to healthy pods",
    ],
    whenToUse: [
      "You have microservices deployed in many containers",
      "You need automatic scaling based on load",
      "You need high availability and fault tolerance",
      "You manage multiple services with complex networking",
    ],
    relations: [
      { type: "used-with", target: "docker", targetLabel: "Docker" },
    ],
    breadcrumb: ["System Design", "Infrastructure"],
  },
  {
    slug: "vm",
    title: "Virtual Machine (VM)",
    domain: "System Design > Infrastructure",
    summary: "Emulated computer system that runs operating systems and applications.",
    definition:
      "A virtual machine is a software emulation of a computer that can run operating systems and applications just like a physical computer. Multiple VMs can run on a single physical machine.",
    mentalModel:
      "A VM is like a computer inside a computer. You can install an entire operating system and run applications inside it, isolated from the host.",
    breadcrumb: ["System Design", "Infrastructure"],
  },
];
