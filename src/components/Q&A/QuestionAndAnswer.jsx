import React from "react";
import { Collapse } from "antd";

const items = [
  {
    key: "1",
    label: "What is Airbnb and how does it work?",
    children: (
      <p>
        We verify profiles and listings to make sharing a place easy, fun, and
        safe for millions of hosts and travelers around the world.
      </p>
    ),
  },
  {
    key: "2",
    label: "How to use search filters?",
    children: (
      <p>
        Our search filters make it easy to find rentals with the features you
        need. Learn more about using search filters and discover more flexible
        ways to search.
      </p>
    ),
  },
  {
    key: "3",
    label: "Do I need to meet the Landlord?",
    children: (
      <p>
        Options like self-check-in or booking an entire home allow you to
        interact with your Host primarily through in-app messaging – you can
        message them at any time if something goes wrong.
      </p>
    ),
  },
  {
    key: "4",
    label:
      "What if I need to cancel due to a problem with the listing or with the Host?",
    children: (
      <p>
        In most cases, you can resolve any issues directly by messaging the
        Host. If they can't help, simply contact Airbnb within 24 hours of
        discovering the issue.
      </p>
    ),
  },
  {
    key: "5",
    label: "Need more information?",
    children: <p>Visit our Help Center for more answers to your questions.</p>,
  },
];

const QuestionAndAnswer = () => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 md:px-10 lg:px-20">
      <section className="flex w-full py-12 sm:flex-col md:flex-row QA_wrapper">
        <div className="mr-12">
          <h2
            className="pb-7 m-0 font-semibold tracking-widest sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl xl:leading-10"
            style={{ lineHeight: "3.375rem", letterSpacing: "-0.02em" }}
          >
            Answering your questions
          </h2>
        </div>
        <Collapse accordion items={items} />
      </section>
    </div>
  );
};

export default QuestionAndAnswer;
