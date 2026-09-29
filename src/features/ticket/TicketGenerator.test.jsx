import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import TicketGenerator from "./TicketGenerator";
import { generateTicketQr } from "./ticketApi";

vi.mock("./ticketApi", () => ({
  generateTicketQr: vi.fn(),
}));

describe("TicketGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the Ticket QR Code Generator", () => {
    render(<TicketGenerator />);

    expect(
      screen.getByRole("heading", {
        name: /ticket qr code generator/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/ticket id/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    ).toBeInTheDocument();
  });

  test("shows required error when Ticket ID is empty", async () => {
    render(<TicketGenerator />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Ticket ID is required",
    );

    expect(generateTicketQr).not.toHaveBeenCalled();
  });

  test("shows invalid error for an invalid Ticket ID", async () => {
    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    fireEvent.change(input, {
      target: {
        value: "INVALID-123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid Ticket ID",
    );

    expect(generateTicketQr).not.toHaveBeenCalled();
  });

  test("accepts a valid Ticket ID", async () => {
    generateTicketQr.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    await waitFor(() => {
      expect(generateTicketQr).toHaveBeenCalledWith("TICKET-12345");
    });
  });

  test("shows a QR result for a valid Ticket ID", async () => {
    generateTicketQr.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    const qrRegion = await screen.findByRole("region", {
      name: /generated qr code/i,
    });

    expect(qrRegion).toBeInTheDocument();

    expect(qrRegion.querySelector(".ticket-reference span")).toHaveTextContent(
      "Ticket ID",
    );

    expect(
      qrRegion.querySelector(".ticket-reference strong"),
    ).toHaveTextContent("TICKET-12345");

    expect(
      screen.getByAltText("QR code for ticket TICKET-12345"),
    ).toBeInTheDocument();
  });

  test("shows loading state while QR code is generating", async () => {
    let resolveRequest;

    generateTicketQr.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    const loadingState = screen.getByRole("status");

    expect(loadingState).toBeInTheDocument();

    expect(loadingState).toHaveTextContent("Generating QR code");

    resolveRequest({
      qrCode: "data:image/png;base64,test",
    });

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  test("shows error when QR generation fails", async () => {
    generateTicketQr.mockRejectedValue(new Error("API failed"));

    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Unable to generate QR code",
    );
  });

  test("clears the error when the user changes the input", async () => {
    render(<TicketGenerator />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Ticket ID is required",
    );

    fireEvent.change(screen.getByLabelText(/ticket id/i), {
      target: {
        value: "TICKET-12345",
      },
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  test("shows the empty state initially", () => {
    render(<TicketGenerator />);

    expect(screen.getByText("No QR code generated")).toBeInTheDocument();

    expect(
      screen.getByText(/enter a ticket id above and generate a qr code/i),
    ).toBeInTheDocument();
  });

  test("disables input and button while generating", async () => {
    let resolveRequest;

    generateTicketQr.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    render(<TicketGenerator />);

    const input = screen.getByLabelText(/ticket id/i);

    const button = screen.getByRole("button", {
      name: /generate qr code/i,
    });

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();

    resolveRequest({
      qrCode: "data:image/png;base64,test",
    });

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });

  test("Ticket ID input has an accessible label", () => {
    render(<TicketGenerator />);

    const input = screen.getByLabelText("Ticket ID");

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "ticket-id");
  });

  test("invalid input exposes the error through aria-describedby", async () => {
    render(<TicketGenerator />);

    const input = screen.getByLabelText("Ticket ID");

    fireEvent.change(input, {
      target: {
        value: "INVALID-123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    const error = await screen.findByRole("alert");

    expect(error).toHaveTextContent("Invalid Ticket ID");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "ticket-id-error");
  });

  test("loading state is announced with status role", async () => {
    let resolveRequest;

    generateTicketQr.mockReturnValue(
      new Promise((resolve) => {
        resolveRequest = resolve;
      }),
    );

    render(<TicketGenerator />);

    const input = screen.getByLabelText("Ticket ID");

    fireEvent.change(input, {
      target: {
        value: "TICKET-12345",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    const status = screen.getByRole("status");

    expect(status).toHaveAttribute("aria-live", "polite");

    expect(status).toHaveTextContent("Generating QR code");

    resolveRequest({
      qrCode: "data:image/png;base64,test",
    });

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  test("generated QR code has meaningful alternative text", async () => {
    generateTicketQr.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    render(<TicketGenerator />);

    const input = screen.getByLabelText("Ticket ID");

    fireEvent.change(input, {
      target: {
        value: "TICKET-98765",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate qr code/i,
      }),
    );

    const qrImage = await screen.findByRole("img");

    expect(qrImage).toHaveAttribute("alt", "QR code for ticket TICKET-98765");
  });

  test("form can be submitted with the Enter key", async () => {
    generateTicketQr.mockResolvedValue({
      qrCode: "data:image/png;base64,test",
    });

    render(<TicketGenerator />);

    const input = screen.getByLabelText("Ticket ID");

    fireEvent.change(input, {
      target: {
        value: "TICKET-55555",
      },
    });

    fireEvent.keyDown(input, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    fireEvent.submit(input.closest("form"));

    await waitFor(() => {
      expect(generateTicketQr).toHaveBeenCalledWith("TICKET-55555");
    });
  });
});

test("rejects HTML or script input as an invalid Ticket ID", async () => {
  render(<TicketGenerator />);

  const input = screen.getByLabelText("Ticket ID");

  fireEvent.change(input, {
    target: {
      value: '<script>alert("xss")</script>',
    },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /generate qr code/i,
    }),
  );

  const error = await screen.findByRole("alert");

  expect(error).toHaveTextContent("Invalid Ticket ID");
  expect(generateTicketQr).not.toHaveBeenCalled();
});

test("does not execute HTML supplied as Ticket ID", async () => {
  render(<TicketGenerator />);

  const input = screen.getByLabelText("Ticket ID");

  fireEvent.change(input, {
    target: {
      value: '<img src="x" onerror="alert(1)">',
    },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /generate qr code/i,
    }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Invalid Ticket ID",
  );

  expect(
    document.querySelector('img[src="x"][onerror="alert(1)"]'),
  ).not.toBeInTheDocument();

  expect(generateTicketQr).not.toHaveBeenCalled();
});

test("shows a connection error when the server cannot be reached", async () => {
  generateTicketQr.mockRejectedValue(new Error("Failed to fetch"));

  render(<TicketGenerator />);

  const input = screen.getByLabelText("Ticket ID");

  fireEvent.change(input, {
    target: {
      value: "TICKET-12345",
    },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /generate qr code/i,
    }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "Unable to connect to the server. Check your connection and try again.",
  );

  expect(screen.queryByRole("status")).not.toBeInTheDocument();

  expect(input).not.toBeDisabled();
});
