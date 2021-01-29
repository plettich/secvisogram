import React from 'react'
import View from '../../../lib/SecvisogramPage/View'
import seed1 from './SecvisogramPage/seed-1.json'
import seed2 from './SecvisogramPage/seed-2.json'

export const title = 'SecvisogramPage'

const props = {
  isLoading: false,
  isSaving: false,
  data: {
    documentIsValid: null,
    errors: [],
    doc: {
      document: {
        csaf_version: '',
        title: '',
        publisher: {
          type: '',
        },
        type: '',
        tracking: {
          current_release_date: '',
          id: '',
          initial_release_date: '',
          revision_history: [
            {
              number: '',
              date: '',
              summary: '',
            },
          ],
          status: '',
          version: '',
        },
        acknowledgments: [
          {
            names: [],
            organizations: [],
            summary: '',
            urls: [],
          },
        ],
      },
      product_tree: {},
      vulnerabilities: [
        {
          notes: [
            {
              type: '',
              text: '',
            },
          ],
        },
      ],
    },
  },
  activeTab: /** @type {'EDITOR'} */ ('EDITOR'),
  onNew: console.log.bind(console, 'onNew'),
  onDownload: console.log.bind(console, 'onDownload'),
  onOpen: console.log.bind(console, 'onOpen'),
  onSave: console.log.bind(console, 'onSave'),
  onChangeTab: console.log.bind(console, 'onChangeTab'),
  onValidate: console.log.bind(console, 'onValidate'),
  onNewFormDoc: console.log.bind(console, 'onNewFormDoc'),
  onNewSourceDoc: console.log.bind(console, 'onNewSourceDoc'),
  onStrip: (/** @type {any[]} */ ...args) => {
    console.log('onStrip', ...args)
    return new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            document: seed1,
            strippedPaths: [
              {
                message: 'value is empty',
                dataPath: '/my/data/path',
                error: false,
              },
              {
                message: 'value is invalid',
                dataPath: '/my/data/path',
                error: true,
              },
            ],
          }),
        500
      )
    })
  },
}

export const tests = [
  {
    title: 'Is loading',
    render: () => <View {...props} data={null} isLoading={true} />,
  },
  {
    title: 'Is saving',
    render: () => <View {...props} isSaving={true} />,
  },
  {
    title: 'With valid document',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, documentIsValid: true, errors: [] }}
      />
    ),
  },
  {
    title: 'With invalid document',
    render: () => (
      <View
        {...props}
        data={{
          ...props.data,
          documentIsValid: false,
          errors: [
            { dataPath: '/document', message: '' },
            { dataPath: '/document/acknowledgments', message: '' },
            { dataPath: '/document/acknowledgments/0', message: '' },
            { dataPath: '/document/acknowledgments/0/names', message: '' },
            {
              dataPath: '/document/acknowledgments/0/organizations',
              message: '',
            },
            {
              dataPath: '/document/acknowledgments/0/urls',
              message: '',
            },
            {
              dataPath: '/document/publisher',
              message: '',
            },
            {
              dataPath: '/document/tracking',
              message: '',
            },
            {
              dataPath: '/document/tracking/revision_history',
              message: '',
            },
            {
              dataPath: '/document/tracking/revision_history/0',
              message: '',
            },
          ],
        }}
      />
    ),
  },
  {
    title: 'Editor',
    render: () => <View {...props} />,
  },
  {
    title: 'Editor (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
      />
    ),
  },
  {
    title: 'Editor (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
      />
    ),
  },
  {
    title: 'Source',
    render: () => <View {...props} activeTab="SOURCE" />,
  },
  {
    title: 'Advisory',
    render: () => <View {...props} activeTab="ADVISORY" />,
  },
  {
    title: 'Advisory (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
        activeTab="ADVISORY"
      />
    ),
  },
  {
    title: 'Advisory (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
        activeTab="ADVISORY"
      />
    ),
  },
  {
    title: 'HTML',
    render: () => <View {...props} activeTab="HTML" />,
  },
  {
    title: 'HTML (seed-1)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed1) }}
        activeTab="HTML"
      />
    ),
  },
  {
    title: 'HTML (seed-2)',
    render: () => (
      <View
        {...props}
        data={{ ...props.data, doc: /** @type {any} */ (seed2) }}
        activeTab="HTML"
      />
    ),
  },
  {
    title: 'CSAF-JSON',
    render: () => <View {...props} activeTab="CSAF-JSON" />,
  },
  {
    title: 'CSAF-JSON without deletions',
    render: () => (
      <View
        {...props}
        activeTab="CSAF-JSON"
        onStrip={async () => {
          return { document: seed1, strippedPaths: [] }
        }}
      />
    ),
  },
]
