/**
 * Tests for Contact.tsx (PR changes)
 *
 * Coverage:
 * - Rendered structure: eyebrow, headline, highlight span, subtitle
 * - 8 decorative shapes with correct classes and aria-hidden
 * - 4 contact cards with correct hrefs and labels
 * - External links have correct security attributes
 * - Footer copyright text
 * - GSAP registerPlugin called inside useEffect
 * - prefers-reduced-motion: skip animation, apply final state immediately
 * - FOUC prevention: elements initially hidden when motion allowed
 * - Shape positions (left/top inline styles)
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// ─── GSAP mock ────────────────────────────────────────────────────────────────
// jest.mock is hoisted — define fns inside factory to avoid TDZ, then export them
// so tests can reference them.

const mockContextRevert = jest.fn();

jest.mock('gsap', () => {
  const contextMock = jest.fn((callback: (self?: unknown) => void) => {
    callback();
    return { revert: mockContextRevert };
  });
  const registerPluginMock = jest.fn();
  const setMock = jest.fn();
  const fromToMock = jest.fn();
  const toMock = jest.fn();

  return {
    __esModule: true,
    default: {
      registerPlugin: registerPluginMock,
      context: contextMock,
      set: setMock,
      fromTo: fromToMock,
      to: toMock,
      utils: {
        random: jest.fn(() => 0),
      },
      __mocks: { contextMock, registerPluginMock, setMock, fromToMock, toMock },
    },
  };
});

jest.mock('gsap/ScrollTrigger', () => ({
  __esModule: true,
  ScrollTrigger: {},
}));

// ─── matchMedia helper ─────────────────────────────────────────────────────────
function mockMatchMedia(prefersReducedMotion: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? prefersReducedMotion : false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

// Retrieve mock functions from the hoisted mock
import gsap from 'gsap';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gsapMocks = (gsap as unknown as { __mocks: Record<string, jest.Mock> }).__mocks;

import Contact from './Contact';

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Contact component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockMatchMedia(false);
  });

  // ── Structure & Content ──────────────────────────────────────────────────────

  it('renders the section element', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('section')).toBeInTheDocument();
  });

  it('renders the eyebrow text "GET IN TOUCH"', () => {
    render(<Contact />);
    expect(screen.getByText('GET IN TOUCH')).toBeInTheDocument();
  });

  it('renders an h2 headline element', () => {
    render(<Contact />);
    const headline = screen.getByRole('heading', { level: 2 });
    expect(headline).toBeInTheDocument();
  });

  it('headline contains the expected text', () => {
    render(<Contact />);
    const headline = screen.getByRole('heading', { level: 2 });
    expect(headline.textContent).toContain("Let's build");
    expect(headline.textContent).toContain('something');
    expect(headline.textContent).toContain('together');
  });

  it('renders the "together" highlight span inside the headline', () => {
    render(<Contact />);
    const headline = screen.getByRole('heading', { level: 2 });
    const highlight = headline.querySelector('.highlight');
    expect(highlight).toBeInTheDocument();
    expect(highlight?.textContent).toBe('together');
  });

  it('renders the subtitle with the Korean text', () => {
    render(<Contact />);
    expect(
      screen.getByText(/새로운 프로젝트, 협업, 또는 그냥 인사/)
    ).toBeInTheDocument();
  });

  it('renders the footer copyright text', () => {
    render(<Contact />);
    expect(screen.getByText(/2025 김성훈/)).toBeInTheDocument();
  });

  it('renders a footer element', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('renders the bgGlow decorative div', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('.bgGlow')).toBeInTheDocument();
  });

  // ── Decorative shapes ────────────────────────────────────────────────────────

  it('renders the shapes container with aria-hidden="true"', () => {
    const { container } = render(<Contact />);
    const shapesContainer = container.querySelector('[aria-hidden="true"]');
    expect(shapesContainer).toBeInTheDocument();
  });

  it('renders exactly 8 decorative shape spans inside the shapes container', () => {
    const { container } = render(<Contact />);
    const shapesContainer = container.querySelector('[aria-hidden="true"]');
    const shapes = shapesContainer?.querySelectorAll('span');
    expect(shapes).toHaveLength(8);
  });

  it.each([
    ['shapeCircle', { left: '8%', top: '14%' }],
    ['shapeRing', { left: '22%', top: '38%' }],
    ['shapeSquare', { left: '78%', top: '18%' }],
    ['shapeTriangle', { left: '88%', top: '52%' }],
    ['shapeDot', { left: '6%', top: '62%' }],
    ['shapeCross', { left: '92%', top: '70%' }],
    ['shapeBlob', { left: '45%', top: '8%' }],
    ['shapeRingSm', { left: '70%', top: '40%' }],
  ] as const)('renders %s at correct position', (shapeClass, position) => {
    const { container } = render(<Contact />);
    const el = container.querySelector(`.${shapeClass}`);
    expect(el).toBeInTheDocument();
    expect(el).toHaveStyle({ left: position.left, top: position.top });
  });

  it('each shape also carries the base "shape" class', () => {
    const { container } = render(<Contact />);
    const shapesContainer = container.querySelector('[aria-hidden="true"]');
    const spans = Array.from(shapesContainer?.querySelectorAll('span') ?? []);
    expect(spans.length).toBeGreaterThan(0);
    spans.forEach((span) => {
      expect(span.classList.contains('shape')).toBe(true);
    });
  });

  // ── Contact cards ────────────────────────────────────────────────────────────

  it('renders the Email contact card with correct mailto href', () => {
    render(<Contact />);
    const emailLink = screen.getByRole('link', { name: /Email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:uiux-ksh@naver.com');
  });

  it('renders the Email card value text', () => {
    render(<Contact />);
    expect(screen.getByText('uiux-ksh@naver.com')).toBeInTheDocument();
  });

  it('renders the Phone contact card with correct tel href', () => {
    render(<Contact />);
    const phoneLink = screen.getByRole('link', { name: /Phone/i });
    expect(phoneLink).toHaveAttribute('href', 'tel:010-3679-5721');
  });

  it('renders the Phone card value text', () => {
    render(<Contact />);
    expect(screen.getByText('010-3679-5721')).toBeInTheDocument();
  });

  it('renders the GitHub contact card with correct href', () => {
    render(<Contact />);
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/uiux-ksh');
  });

  it('renders the Blog contact card with correct href', () => {
    render(<Contact />);
    const blogLink = screen.getByRole('link', { name: /Blog/i });
    expect(blogLink).toHaveAttribute('href', 'https://uiux-ksh.tistory.com');
  });

  it('renders exactly 4 contact card links', () => {
    render(<Contact />);
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });

  it('GitHub link opens in a new tab', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('target', '_blank');
  });

  it('GitHub link has rel="noopener noreferrer"', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });

  it('Blog link opens in a new tab with rel="noopener noreferrer"', () => {
    render(<Contact />);
    const blogLink = screen.getByRole('link', { name: /Blog/i });
    expect(blogLink).toHaveAttribute('target', '_blank');
    expect(blogLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('Email link does NOT open in a new tab', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Email/i })).not.toHaveAttribute('target', '_blank');
  });

  it('Phone link does NOT open in a new tab', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: /Phone/i })).not.toHaveAttribute('target', '_blank');
  });

  it('each contact card displays its label and value', () => {
    render(<Contact />);
    // Labels
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    // Values
    expect(screen.getByText('uiux-ksh@naver.com')).toBeInTheDocument();
    expect(screen.getByText('010-3679-5721')).toBeInTheDocument();
    expect(screen.getByText('github.com/uiux-ksh')).toBeInTheDocument();
    expect(screen.getByText('uiux-ksh.tistory.com')).toBeInTheDocument();
  });

  // ── GSAP / Animation ─────────────────────────────────────────────────────────

  it('calls gsap.registerPlugin (ScrollTrigger registration) inside useEffect', () => {
    render(<Contact />);
    expect(gsapMocks.registerPluginMock).toHaveBeenCalledTimes(1);
  });

  it('creates a GSAP context and reverts it on unmount', () => {
    const { unmount } = render(<Contact />);
    expect(gsapMocks.contextMock).toHaveBeenCalled();
    unmount();
    expect(mockContextRevert).toHaveBeenCalled();
  });

  it('when motion is allowed, calls gsap.set with autoAlpha: 0 (FOUC prevention)', () => {
    mockMatchMedia(false);
    render(<Contact />);
    const hiddenCalls = gsapMocks.setMock.mock.calls.filter(
      ([, props]: [unknown, { autoAlpha?: number }]) => props?.autoAlpha === 0
    );
    expect(hiddenCalls.length).toBeGreaterThan(0);
  });

  it('when motion is allowed, calls gsap.fromTo for entrance animations', () => {
    mockMatchMedia(false);
    render(<Contact />);
    expect(gsapMocks.fromToMock).toHaveBeenCalled();
  });

  it('when motion is allowed, calls gsap.fromTo at least twice (shapes + intro + cards)', () => {
    mockMatchMedia(false);
    render(<Contact />);
    expect(gsapMocks.fromToMock.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  // ── prefers-reduced-motion ────────────────────────────────────────────────────

  describe('prefers-reduced-motion: reduce', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockMatchMedia(true);
    });

    it('does NOT call gsap.fromTo when reduced-motion is active', () => {
      render(<Contact />);
      expect(gsapMocks.fromToMock).not.toHaveBeenCalled();
    });

    it('calls gsap.set with autoAlpha: 1 (visible) when reduced-motion is active', () => {
      render(<Contact />);
      const visibleCalls = gsapMocks.setMock.mock.calls.filter(
        ([, props]: [unknown, { autoAlpha?: number }]) => props?.autoAlpha === 1
      );
      expect(visibleCalls.length).toBeGreaterThan(0);
    });

    it('calls gsap.set with y: 0 when reduced-motion is active', () => {
      render(<Contact />);
      const y0Calls = gsapMocks.setMock.mock.calls.filter(
        ([, props]: [unknown, { y?: number }]) => props?.y === 0
      );
      expect(y0Calls.length).toBeGreaterThan(0);
    });

    it('reads window.matchMedia with the prefers-reduced-motion query', () => {
      render(<Contact />);
      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });

    it('does NOT call gsap.to for idle floating when reduced-motion is active', () => {
      render(<Contact />);
      expect(gsapMocks.toMock).not.toHaveBeenCalled();
    });
  });

  // ── Regression / boundary ────────────────────────────────────────────────────

  it('does not render the old SVG "THANK YOU" stroke text (removed in PR)', () => {
    render(<Contact />);
    expect(screen.queryByText('THANK YOU')).not.toBeInTheDocument();
  });

  it('does not render the old Korean title "봐주셔서 감사합니다" (removed in PR)', () => {
    render(<Contact />);
    expect(screen.queryByText('봐주셔서 감사합니다')).not.toBeInTheDocument();
  });

  it('renders without crashing when re-rendered multiple times', () => {
    const { rerender } = render(<Contact />);
    expect(() => {
      rerender(<Contact />);
      rerender(<Contact />);
    }).not.toThrow();
  });
});
